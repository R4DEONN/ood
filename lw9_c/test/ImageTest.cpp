#include "catch2/catch_test_macros.hpp"
#include "image.h"

TEST_CASE( "Tile instances count is tracked correctly", "[tile]" ) {
	REQUIRE( Tile::GetInstanceCount() == 0 );
	{
		Tile t1;
		REQUIRE( Tile::GetInstanceCount() == 1 );

		Tile t2('x');
		REQUIRE( Tile::GetInstanceCount() == 2 );
	}
	REQUIRE( Tile::GetInstanceCount() == 0 );
}

TEST_CASE( "Tile operations work correctly", "[tile]" ) {
	Tile t;
	REQUIRE( t.GetPixel({0, 0}) == ' ' );
	REQUIRE( t.GetPixel({7, 7}) == ' ' );
	REQUIRE( t.GetPixel({8, 8}) == ' ' );
	t.SetPixel({0, 0}, 'x');
	REQUIRE( t.GetPixel({0, 0}) == 'x' );
	t.SetPixel({8, 8}, 'y');
	REQUIRE( t.GetPixel({8, 8}) == ' ' );
}

TEST_CASE( "Image instances have correct size", "[image]" ) {
	Image img({8, 8});
	REQUIRE( img.GetSize().width == 8 );
	REQUIRE( img.GetSize().height == 8 );
}

TEST_CASE( "Image pixel operations work correctly", "[image]" ) {
	Image img({8, 8});
	REQUIRE( img.GetPixel({0, 0}) == ' ' );
	REQUIRE( img.GetPixel({7, 7}) == ' ' );
	REQUIRE( img.GetPixel({8, 8}) == ' ' );
	img.SetPixel({0, 0}, 'x');
	REQUIRE( img.GetPixel({0, 0}) == 'x' );
	img.SetPixel({8, 8}, 'y');
	REQUIRE( img.GetPixel({8, 8}) == ' ' );
}

TEST_CASE( "Image LoadImage function works correctly", "[image]" ) {
	std::string pixels = "****\n****\n";
	auto img = LoadImage(pixels);
	REQUIRE( img.GetSize().width == 4 );
	REQUIRE( img.GetSize().height == 2 );

	REQUIRE( img.GetPixel({0, 0}) == '*' );
	REQUIRE( img.GetPixel({3, 1}) == '*' );
	REQUIRE( img.GetPixel({4, 2}) == ' ' );
}

TEST_CASE("Copy on Write works correctly", "[cow][image]") {
	Image img1({8, 8}, 'x');
	Image img2 = img1;

	REQUIRE(img1.GetSize().width == img2.GetSize().width);
	REQUIRE(img1.GetSize().height == img2.GetSize().height);

	img1.SetPixel({0, 0}, 'y');
	REQUIRE(img1.GetPixel({0, 0}) != img2.GetPixel({0, 0}));
}

TEST_CASE("Copy on Write correctly duplicates tiles", "[cow][tile][image]") {
	Image img({32, 32}, 'x');

	int initialTileCount = Tile::GetInstanceCount();

	Image img2 = img;

	REQUIRE(Tile::GetInstanceCount() == initialTileCount);

	img.SetPixel({0, 0}, 'y');

	REQUIRE(Tile::GetInstanceCount() == initialTileCount + 1);
}