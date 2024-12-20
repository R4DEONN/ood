cmake_minimum_required(VERSION 3.22)
SET(CMAKE_CXX_STANDARD 20)
project(MainApp)

enable_testing()

list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

set(EXECUTABLE_OUTPUT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/bin")

add_executable(MainApp main.cpp)

add_subdirectory(src)
target_link_libraries(MainApp PRIVATE app)

add_subdirectory(test)

add_dependencies(MainApp run_tests)