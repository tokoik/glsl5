#version 120

// bump2.frag

uniform sampler2D texture;

varying vec4 position;
varying vec3 light;
varying vec3 n;
varying vec3 t;

void main (void)
{
  // 接空間から視点座標系への変換行列
  vec3 fn = normalize(n);
  vec3 ft = normalize(t);
  vec3 fb = cross(fn, ft);
  mat3 toView = mat3(ft, fb, fn);

  // 法線マップから得た法線ベクトルを視点座標系に変換する
  vec4 color = texture2DProj(texture, gl_TexCoord[0]);
  vec3 fnormal = toView * (color.rgb * 2.0 - 1.0);

  // 視点座標系における光線ベクトル，視線ベクトル，中間ベクトル
  vec3 flight = normalize(light);
  vec3 fview = -normalize(position.xyz);
  vec3 halfway = normalize(flight + fview);

  // 拡散反射率，鏡面反射率
  float diffuse = max(dot(fnormal, flight), 0.0);
  float specular = pow(max(dot(fnormal, halfway), 0.0), gl_FrontMaterial.shininess);

  // フラグメントの色
  gl_FragColor = gl_FrontLightProduct[0].ambient
               + gl_FrontLightProduct[0].diffuse * diffuse
               + gl_FrontLightProduct[0].specular * specular;
}
