"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "@/hooks/useTheme";
import { hexToVec3 } from "@/themes/shared/utils/color";

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

function buildFragmentShader(color1: [number, number, number], color2: [number, number, number]) {
  return `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    vec2 center = vec2(0.5, 0.6);
    float dist = distance(uv, center);
    vec3 color1 = vec3(${color1[0]}, ${color1[1]}, ${color1[2]});
    vec3 color2 = vec3(${color2[0]}, ${color2[1]}, ${color2[2]});
    float glow = smoothstep(0.5, 0.0, dist);
    vec3 finalColor = mix(color2, color1, glow * 0.4);
    finalColor += 0.02 * sin(uv.x * 10.0 + u_time);
    gl_FragColor = vec4(finalColor, 1.0);
}`;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function GlowShader() {
  const { tokens } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const glContext =
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    if (!glContext) return;

    const gl = glContext as WebGLRenderingContext;
    const glowInner = hexToVec3(tokens.colors.secondaryContainer);
    const glowOuter = hexToVec3(tokens.colors.background);
    const fragmentShaderSource = buildFragmentShader(glowInner, glowOuter);

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncSize)
        : null;
    resizeObserver?.observe(canvas);
    syncSize();

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");

    let frameId = 0;

    const render = (t: number) => {
      if (!resizeObserver) syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [tokens.colors.background, tokens.colors.secondaryContainer]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      aria-hidden="true"
    />
  );
}
