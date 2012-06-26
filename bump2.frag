// bump2.frag

uniform sampler2D texture;

varying vec3 light;
varying vec3 view;
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
  vec3 fnormal = toView * (vec3(color) * 2.0 - 1.0);

  vec3 flight = normalize(light);
  float diffuse = dot(flight, fnormal);

  gl_FragColor = gl_FrontLightProduct[0].ambient;
  if (diffuse > 0.0) {
	vec3 fview = normalize(view);
    vec3 halfway = normalize(flight - fview);
    float specular = pow(max(dot(fnormal, halfway), 0.0), gl_FrontMaterial.shininess);
    gl_FragColor += gl_FrontLightProduct[0].diffuse * diffuse
                 + gl_FrontLightProduct[0].specular * specular;
  }
}
