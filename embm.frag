#version 120

// embm.frag

// ラスタライザから受け取る視点座標系の光線ベクトルの補間値
varying vec3 light;

// ラスタライザから受け取る視点座標系の視線ベクトルの補間値
varying vec3 view;

// ラスタライザから受け取る接空間の基底ベクトルの補間値
varying vec3 t, b, n;

// テクスチャのサンプラ
uniform sampler2D color;

// 環境マップのサンプラ
uniform samplerCube environment;

void main ()
{
  // 視点座標系への変換行列
  mat3 toView = mat3(normalize(t), normalize(b), normalize(n));

  // 法線マップから視点座標系の法線ベクトルを得る
  vec4 fcolor = texture2DProj(color, gl_TexCoord[0]);
  vec3 fnormal = toView * (fcolor.rgb * 2.0 - 1.0);

  // 視点座標系の光線ベクトル
  vec3 flight = normalize(light);

  // 拡散反射率
  float diffuse = max(dot(fnormal, flight), 0.0);

  // 視線の反射ベクトルでキューブマップをサンプリングして環境の色を得る
  vec4 specular = textureCube(environment, reflect(fnormal, view));

  // フラグメントの色
  gl_FragColor = gl_FrontLightProduct[0].ambient
               + gl_FrontLightProduct[0].diffuse * diffuse
               + gl_FrontLightProduct[0].specular * specular;
}
