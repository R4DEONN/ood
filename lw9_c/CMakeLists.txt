cmake_minimum_required(VERSION 3.22)
SET(CMAKE_CXX_STANDARD 20)
project(MainApp)

set(CMAKE_CXX_STANDARD 20)
set(EXECUTABLE_OUTPUT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/bin")

FILE(GLOB_RECURSE SRC "src/*.h" "src/*.cpp")
add_executable(MainApp ${SRC})
