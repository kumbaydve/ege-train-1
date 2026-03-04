import { useState, useRef, useEffect } from 'react'

import Shader from './Shader'
import Percentage from './Percentage'
import PickPraser from '../utility/pick-parser'

const shader_code = `precision highp float;
uniform vec2 uResolution;
uniform float uTime;

vec3 hex(int r_int, int g_int, int b_int) {
    return vec3(float(r_int) / 255.0, float(g_int) / 255.0, float(b_int) / 255.0);
}

void main()
{
    const float radius = 0.25;
    const float fade_inside = 9.;
    const float fade_outside = 6.;
    const float max_deviation = 0.1;
    const float rotation_speed = 0.1;
    const float distortion = 0.03;
    const float spread_factor = 1.;
    const float color_rotation = 0.07;
    
    const float pi = 3.14159265;
    const int n = 6;
    float t = uTime;

    //float a[n] = float[](cos(t/2.),1.,sin(t),sin(t+pi/4.),-sin(t/2.),sin(t*2.)*cos(t));
    //float phase[n] = float[](0.,-sin(t*0.3),0.,0.1,t*0.2,0.);
    //const float w[n] = float[](1.,6.,1.,9.,-5.,6.);
    
    float a[n];
    a[0]=cos(.5 * t);
    a[1]=1.;
    a[2]=sin(t);
    a[3]=sin(t+pi/4.);
    a[4]=-sin(t/2.);
    a[5]=sin(t*2.)*cos(t);

    float phase[n];
    phase[0]=0.;
    phase[1]=-sin(t*0.3);
    phase[2]=0.;
    phase[3]=.1;
    phase[4]=t*.2;
    phase[5]=0.;
    
    float w[n];
    w[0]=1.;
    w[1]=6.;
    w[2]=1.;
    w[3]=9.;
    w[4]=-5.;
    w[5]=6.;

    vec2 uv = gl_FragCoord.xy / uResolution.y - vec2(uResolution.x/(2. * uResolution.y), .5);
    float angle = atan(uv.y, uv.x) + pi;
    float angle_original = angle;
    angle += t * rotation_speed;
    float dist = 0.;
    
    for (int i = 0; i < n; ++i){
        dist += a[i] * sin(w[i] * (angle + phase[i]));
    }
    
    float spread = 7. + sin((angle_original - t * .7) * 3.) * 10.;
    
    float val = length(uv) - radius + dist * distortion;
    if (val < 0.){
        val = 1.0 - abs(val) * fade_inside;
    }
    else{
        val = 1.0 - abs(val) * (fade_outside + spread * spread_factor * sin(angle_original - pi * 0.5) * sin(angle_original - pi * 0.5));
    }
    
    val = clamp(val, 0., 1.);
    
    vec3 col;
    if (mod(angle_original + t * color_rotation, 2.*pi) < pi){
        col = mix(hex(0x68, 0x00, 0xf0), hex(0xff, 0x00, 0xd4), mod(angle_original + t * color_rotation, 2.*pi) / pi);
    }
    else{
        col = mix(hex(0x68, 0x00, 0xf0), hex(0xff, 0x00, 0xd4), 2. - mod(angle_original + t * color_rotation, 2.*pi) / pi);
    }

    gl_FragColor = vec4(val*val*val, val*val, val*val, val*val) * vec4(col, 1.) * (1. + val*val*0.2);
}`

export default function OverallStat(){
    const [shader_ready, setShaderReady] = useState(false)
    const shader = useRef(null)
    const stat = useRef(null)

    useEffect(() => {
        const pick_parser = new PickPraser()
        stat.current = pick_parser.getStat()

        setShaderReady(true)

        shader.current = <Shader style={{
            width: '100%',
            height: '100%'
        }}>{shader_code}</Shader>
    }, [])

    return <div
    className='flex items-center justify-center'
    style={{
        //maxWidth: '100%',
        //width: '50%',
        //minHeight: '55vh',
        height: '25rem',
        marginTop: '5vh',
        aspectRatio: 2.5
    }}>

        {shader_ready && shader.current}
        
        {/* {stat.current && <Percentage text={{fontSize: '5vw'}} className='overall-stat' style={{position: 'absolute'}}>{stat.current}</Percentage>} */}
        {stat.current && <Percentage className='overall-stat' style={{position: 'absolute'}}>{stat.current}</Percentage>}

    </div>
}