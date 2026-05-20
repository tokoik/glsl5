#version 120

// envbump.vert

attribute vec3 tangent;

varying vec4 position;
varying vec3 light;
varying vec3 n;
varying vec3 t;

void main()
{
  // 光線ベクトルと視線ベクトルを求める
  position = gl_ModelViewMatrix * gl_Vertex;
  light = normalize((gl_LightSource[0].position * position.w - gl_LightSource[0].position.w * position).xyz);
  
  // 法線ベクトルと接線ベクトルを求める
  n = normalize(gl_NormalMatrix * gl_Normal);
  t = normalize(gl_NormalMatrix * tangent);

  // テクスチャ座標と頂点座標を出力する
  gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
  gl_Position = ftransform();
}
