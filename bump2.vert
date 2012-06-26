// bump2.vert

attribute vec3 tangent;

varying vec3 light;
varying vec3 view;
varying vec3 n;
varying vec3 t;

void main()
{
  // 視線ベクトルと光線ベクトルを求める
  view = vec3(gl_ModelViewMatrix * gl_Vertex);
  light = gl_LightSource[0].position.xyz - view;
  
  // 法線ベクトルと接線ベクトルを求める
  n = normalize(gl_NormalMatrix * gl_Normal);
  t = normalize(gl_NormalMatrix * tangent);

  // テクスチャ座標と頂点座標を出力する
  gl_TexCoord[0] = gl_MultiTexCoord0;
  gl_Position = ftransform();
}
