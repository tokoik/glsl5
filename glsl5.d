glsl.o: glsl.cpp glsl.h
main.o: main.cpp normalmap.h glsl.h trackball.h sphere.h
normalmap.o: normalmap.cpp normalmap.h
sphere.o: sphere.cpp sphere.h glsl.h
trackball.o: trackball.cpp trackball.h
