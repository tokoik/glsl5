#version 120

// envbump.vert

attribute vec3 tangent;

varying vec4 p;
varying vec3 l;
varying vec3 n;
varying vec3 t;

void main()
{
  // 光線ベクトルと視線ベクトルを求める
  p = gl_ModelViewMatrix * gl_Vertex;
  l = normalize((gl_LightSource[0].position * p.w - gl_LightSource[0].position.w * p).xyz);
  
  // 法線ベクトルと接線ベクトルを求める
  n = normalize(gl_NormalMatrix * gl_Normal);
  t = normalize(gl_NormalMatrix * tangent);

  // テクスチャ座標と頂点座標を出力する
  gl_TexCoord[0] = gl_MultiTexCoord0;
  gl_Position = ftransform();
}
