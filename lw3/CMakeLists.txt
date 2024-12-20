cmake_minimum_required(VERSION 3.22)
SET(CMAKE_CXX_STANDARD 20)
project(MainApp)

#enable_testing()
#
#list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

set(CMAKE_CXX_STANDARD 20)
set(EXECUTABLE_OUTPUT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/bin")

#add_subdirectory(src)

FILE(GLOB_RECURSE SRC "src/*.h" "src/*.cpp")
add_executable(MainApp main.cpp ${SRC})

#target_link_libraries(MainApp PRIVATE app)

#install(TARGETS MainApp)
#
#add_subdirectory(test)
#
#add_dependencies(CanvasApp run_tests)