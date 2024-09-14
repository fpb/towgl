export const name = 'normal_material';

export const vertex = /* glsl */`

    v_normal = a_normal;
    gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);
`;

export const fragment = /* glsl */`

    color = vec4(v_normal*0.5+vec3(0.5, 0.5, 0.5), 1.0);
`;