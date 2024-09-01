export const name = 'normal_material';

export const vertex = /* glsl */`

    fNormal = normal;
    gl_Position = projection * view * model * vec4(position, 1.0);
`;

export const fragment = /* glsl */`

    gl_FragColor = vec4(fNormal*0.5+vec3(0.5, 0.5, 0.5), 1.0);
`;