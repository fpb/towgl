export const name = 'material';

export const vertex = /* glsl */`
    gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);
`;

export const fragment = /* glsl */`
`;