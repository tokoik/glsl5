#version 120

// bump2.frag

uniform sampler2D texture;

varying vec4 p;
varying vec3 l;
varying vec3 n;
varying vec3 t;

void main (void)
{
  // 接空間から視点座標系への変換行列を求める
  vec3 fn = normalize(n);
  vec3 ft = normalize(t);
  vec3 fb = cross(fn, ft);
  mat3 toView = mat3(ft, fb, fn);

  // 法線マップから得たベクトルを視点座標系に変換する
  vec4 color = texture2DProj(texture, gl_TexCoord[0]);
  vec3 vn = toView * (color.rgb * 2.0 - 1.0);

  // 視点座標系における光線ベクトル，視線ベクトル，中間ベクトルを求める
  vec3 vl = normalize(l);
  vec3 vv = -normalize(p.xyz);
  vec3 vh = normalize(vl + vv);

  // 拡散反射率と鏡面反射率
  float diffuse = max(dot(vn, vl), 0.0);
  float specular = pow(max(dot(vn, vh), 0.0), gl_FrontMaterial.shininess);

  // フラグメントの色
  gl_FragColor = gl_FrontLightProduct[0].ambient
               + gl_FrontLightProduct[0].diffuse * diffuse
               + gl_FrontLightProduct[0].specular * specular;
}
