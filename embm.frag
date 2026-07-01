#version 120

// embm.frag

// ラスタライザから受け取る接空間の光線ベクトルの補間値
varying vec3 tlight;

// ラスタライザから受け取る接空間の視線ベクトルの補間値
varying vec3 tview;

// ラスタライザから受け取る接空間の基底ベクトルの補間値
varying vec3 t, b, n;

// テクスチャのサンプラ
uniform sampler2D color;

// 環境マップのサンプラ
uniform samplerCube environment;

void main ()
{
  // 法線マップから接空間の法線ベクトル得る
  vec4 fcolor = texture2DProj(color, gl_TexCoord[0]);
  vec3 fnormal = fcolor.rgb * 2.0 - 1.0;

  // 接空間における光線ベクトル
  vec3 flight = normalize(tlight);

  // 拡散反射率
  float diffuse = max(dot(fnormal, flight), 0.0);

  // 視点座標系への変換行列
  mat3 toView = mat3(normalize(t), normalize(b), normalize(n));

  // 視線の反射ベクトルでキューブマップをサンプリングして環境の色を得る
  vec4 specular = textureCube(environment, toView * reflect(fnormal, tview));

  // フラグメントの色
  gl_FragColor = gl_FrontLightProduct[0].ambient
               + gl_FrontLightProduct[0].diffuse * diffuse
               + gl_FrontLightProduct[0].specular * specular;
}
