export const name = 'material';

export const vertex = /* glsl */`
    gl_Position = projection * view * model * vec4(position, 1.0);
`;

export const fragment = /* glsl */`
`;