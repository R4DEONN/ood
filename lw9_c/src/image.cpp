#include "image.h"
#include <cassert>
#include <cmath>
#include <ostream>
#include <sstream>
#include <stdexcept>
#include <vector>

Image::Image(const Size size, const char color)
{
	if (size.width < 0 || size.height < 0)
	{
		throw std::out_of_range("Invalid size");
	}

	m_size = size;
	const int tileCountX = std::ceil(static_cast<double>(size.width) / static_cast<double>(Tile::SIZE));
	const int tileCountY = std::ceil(static_cast<double>(size.height) / static_cast<double>(Tile::SIZE));
	m_tiles.reserve(tileCountY);

	for (int y = 0; y < tileCountY; ++y)
	{
		m_tiles.emplace_back();
		m_tiles[y].reserve(tileCountX);
		for (int x = 0; x < tileCountX; ++x)
		{
			m_tiles[y].emplace_back(Tile(color));
		}
	}
}

Size Image::GetSize() const noexcept
{
	return m_size;
}

char Image::GetPixel(Point p) const noexcept
{
	if (!IsPointInSize(p, m_size))
	{
		return ' ';
	}

	const int tileX = p.x / Tile::SIZE;
	const int tileY = p.y / Tile::SIZE;

	const Point localPoint = {p.x % Tile::SIZE, p.y % Tile::SIZE};

	return m_tiles[tileY][tileX]->GetPixel(localPoint);
}

void Image::SetPixel(Point p, char color)
{
	if (!IsPointInSize(p, m_size))
	{
		return;
	}

	const int tileX = p.x / Tile::SIZE;
	const int tileY = p.y / Tile::SIZE;

	const Point localPoint = {p.x % Tile::SIZE, p.y % Tile::SIZE};

	m_tiles[tileY][tileX].Write([localPoint, color](Tile& tile)
	{
		tile.SetPixel(localPoint, color);
	});
}

void Print(const Image &img, std::ostream &out)
{
	const auto [width, height] = img.GetSize();
	for (int y = 0; y < height; ++y)
	{
		for (int x = 0; x < width; ++x)
		{
			out.put(img.GetPixel({x, y}));
		}
		out.put('\n');
	}
}

Image LoadImage(const std::string &pixels)
{
	std::istringstream s(pixels);
	Size size;
	std::string line;
	while (std::getline(s, line))
	{
		size.width = std::max(size.width, static_cast<int>(line.length()));
		++size.height;
	}

	Image img(size);

	s = std::istringstream(pixels);
	for (int y = 0; y < size.height; ++y)
	{
		if (!std::getline(s, line))
			break;

		int x = 0;
		for (const char ch: line)
		{
			img.SetPixel({x++, y}, ch);
		}
	}

	return img;
}
