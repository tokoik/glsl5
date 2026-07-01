#version 120

// embm.vert

// 頂点の接線ベクトル
attribute vec3 tangent;

// ラスタライザに送る視点座標系の光線ベクトル
varying vec3 light;

// ラスタライザに送る視点座標系の視線ベクトル
varying vec3 view;

// ラスタライザに送る接空間の基底ベクトル
varying vec3 t, b, n;

void main()
{
  // 頂点のクリッピング座標値
  gl_Position = ftransform();

  // テクスチャ座標
  gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;

  // 視点座標系の頂点の位置
  vec4 position = gl_ModelViewMatrix * gl_Vertex;

  // 視点座標系の法線ベクトル
  vec3 normal = normalize(gl_NormalMatrix * gl_Normal);

  // 視点座標系の光線ベクトル
  light = normalize((gl_LightSource[0].position * position.w
    - gl_LightSource[0].position.w * position).xyz);

  // 視点座標系の視線ベクトル
  view = -normalize(position.xyz);

  // 法線ベクトルと接線ベクトルから接空間への変換行列
  n = normal;
  t = normalize(gl_NormalMatrix * tangent);
  b = cross(n, t);
}
