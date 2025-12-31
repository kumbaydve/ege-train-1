precision highp float;
uniform vec2 uResolution;
uniform float uTime;

vec3 hex(int r_int, int g_int, int b_int) {
    return vec3(float(r_int) / 255.0, float(g_int) / 255.0, float(b_int) / 255.0);
}

void main()
{
    const float pi = 3.14159265;
    const int n = 6;
    float t = uTime;

    float a[n];
    a[0]=cos(.5 * t);
    a[1]=1.;
    a[2]=sin(t);
    a[3]=1.;
    a[4]=-sin(.5 * t);
    a[5]=1.;

    float of[n];
    of[0]=sin(0.05 * t);
    of[1]=0.;
    of[2]=0.;
    of[3]=sin(.03 * t);
    of[4]=0.;
    of[5]=0.;
    
    float w[n];
    w[0]=1.;
    w[1]=6.;
    w[2]=1.;
    w[3]=9.;
    w[4]=-5.;
    w[5]=6.;
    float s = 2.;
    
    vec2 uv = gl_FragCoord.xy / uResolution.y - vec2(uResolution.x/(2. * uResolution.y), .5);
    
    float angle = atan(uv.y, uv.x) + pi;
    float d = 0.;
    
    for (int i = 0; i < 6; ++i){
        d += a[i] * sin(w[i] * (angle - .5 + of[i]) * s);
    }
    
    float scalor = d * .05 + 1.;
    vec3 col;
    if (angle < pi){
        col = mix(hex(0x68, 0x00, 0xf0), hex(0xff, 0x00, 0xd4), angle / pi);
    }
    else{
        col = mix(hex(0x68, 0x00, 0xf0), hex(0xff, 0x00, 0xd4), 2. - angle / pi);
    }
    
    float spread = 2. * sin((angle + (t + .3 * sin(t)) / 3.) * 3.) - 1.;
    
    float spread1 = 2.5*sin((angle + t/3.)*3.)-1.5;
    spread1 *= 1. + cos(angle)*cos(angle)*.5;
    float spread2 = 1. + sin((angle + t/4.)*2.5)*sin((angle + t/4.)*2.5) * 0.14 *cos(angle)*cos(angle);
    
    float val;
    float k = .23;
    if (length(uv * scalor) - k < 0.){
        val = 1.0 - (13.0 + spread1 * spread2) * abs(length(uv * scalor) - k);
    }
    else{
        val = 1.0 - (8.0 + spread1 * spread2) * abs(length(uv * scalor) - k);
    }

    val = clamp(val, 0., 1.);

    gl_FragColor = vec4(val*val*val, val*val, val*val, val*val) * vec4(col, 1.);
}