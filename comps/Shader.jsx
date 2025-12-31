import { useRef, useEffect } from "react"

export default function Shader({children, style, uniform, delta = 0.016}){
    const self = useRef(null)
    const time = useRef(0)
    const animation_id = useRef(0)

    useEffect(() => {
        if (!self.current) { return }

        const gl = self.current.getContext('webgl')

        if (!gl) { return }

        const vertex = `
            attribute vec2 aPosition;

            void main(){
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `

        const fragment = children.toString() ?? ''

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, vertex)
        gl.compileShader(vertexShader)

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, fragment)
        gl.compileShader(fragmentShader)

        const shaderProgram = gl.createProgram()
        gl.attachShader(shaderProgram, vertexShader)
        gl.attachShader(shaderProgram, fragmentShader)
        gl.linkProgram(shaderProgram)
        gl.useProgram(shaderProgram)

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

        const positions = [-1, -1, 1, -1, -1, 1, 1, 1]
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

        const positionAttribute = gl.getAttribLocation(shaderProgram, 'aPosition')
        gl.enableVertexAttribArray(positionAttribute)
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0)

        const resolutionUniform = gl.getUniformLocation(shaderProgram, 'uResolution')
        const timeUniform = gl.getUniformLocation(shaderProgram, 'uTime')

        let uniforms = []

        if (uniform){
            for (const u of uniform){
                uniforms.push(gl.getUniformLocation(shaderProgram, u[0]))
            }
        }

        const render = () => {
            if (!self.current) { return }

            gl.uniform1f(timeUniform, time.current)
            gl.uniform2f(resolutionUniform, self.current.width, self.current.height)
            
            if (uniform){
                for (let i = 0; i < uniform.length; ++i){
                    if (typeof uniform[i][1] === 'number'){
                        gl.uniform1f(uniforms[i], uniform[i][1])
                    }
                    else if (typeof uniform[i][1] === 'object'){
                        gl.uniform1fv(uniforms[i], uniform[i][1])
                    }
                }
            }

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

            time.current += delta

            animation_id.current = requestAnimationFrame(render)
        }

        const observer = new ResizeObserver((entries) => {
            if (!self.current) {return}
            
            self.current.width = entries[0].contentRect.width
            self.current.height = entries[0].contentRect.height
            
            gl.viewport(0, 0, self.current.width, self.current.height)
        })

        if (self.current){
            observer.observe(self.current)
        }

        render()

        return () => {
            if (self.current){
                observer.unobserve(self.current)
            }

            cancelAnimationFrame(animation_id.current)

            gl.deleteBuffer(positionBuffer)
            gl.deleteProgram(shaderProgram)
            gl.deleteShader(vertexShader)
            gl.deleteShader(fragmentShader)
        }
    }, [])
    
    return <canvas width={400} height={400} ref={self} style={style}></canvas>
}