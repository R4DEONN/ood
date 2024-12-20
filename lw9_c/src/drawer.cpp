#include "drawer.h"
#include <cstdlib>
#include <cassert>

namespace
{

int Sign(const int value)
{
	return (0 < value) - (value < 0);
}

void DrawSteepLine(Image& image, Point from, Point to, const char color)
{
	const int deltaX = std::abs(to.x - from.x);
	const int deltaY = std::abs(to.y - from.y);

	assert(deltaY >= deltaX);

	if (from.y > to.y)
	{
		std::swap(from, to);
	}

	const int stepX = Sign(to.x - from.x);
	const int errorThreshold = deltaY + 1;
	const int deltaErr = deltaX + 1;

	int error = deltaErr / 2;

	for (Point p = from; p.y <= to.y; ++p.y)
	{
		image.SetPixel({ p.x, p.y }, color);
		assert((p.y != to.y) || (p.x == to.x));

		error += deltaErr;

		if (error >= errorThreshold)
		{
			p.x += stepX;
			error -= errorThreshold;
		}
	}
}

void DrawSlopeLine(Image& image, Point from, Point to, char color)
{
	const int deltaX = std::abs(to.x - from.x);
	const int deltaY = std::abs(to.y - from.y);

	assert(deltaX >= deltaY);

	if (from.x > to.x)
	{
		std::swap(from, to);
	}

	const int stepY = Sign(to.y - from.y);
	const int errorThreshold = deltaX + 1;
	const int deltaErr = deltaY + 1;

	int error = deltaErr / 2;

	for (Point p = from; p.x <= to.x; ++p.x)
	{
		image.SetPixel({ p.x, p.y }, color);
		assert((p.x != to.x) || (p.y == to.y));

		error += deltaErr;

		if (error >= errorThreshold)
		{
			p.y += stepY;
			error -= errorThreshold;
		}
	}
}

} // namespace

void DrawLine(Image& image, Point from, Point to, char color)
{
	const int deltaX = std::abs(to.x - from.x);
	const int deltaY = std::abs(to.y - from.y);

	if (deltaY > deltaX)
	{
		DrawSteepLine(image, from, to, color);
	}
	else
	{
		DrawSlopeLine(image, from, to, color);
	}
}

void DrawCircle(Image& img, Point center, int radius, char color) {
	auto sim = [&](int x, int y) {
		img.SetPixel({ x + center.x, y + center.y }, color);
		img.SetPixel({ x + center.x, -y + center.y }, color);
		img.SetPixel({ -x + center.x, -y + center.y }, color);
		img.SetPixel({ -x + center.x, y + center.y }, color);
		img.SetPixel({ y + center.x, x + center.y }, color);
		img.SetPixel({ y + center.x, -x + center.y }, color);
		img.SetPixel({ -y + center.x, -x + center.y }, color);
		img.SetPixel({ -y + center.x, x + center.y }, color);
	};

	int d = 3 - 2 * radius;
	int x = 0;
	int y = radius;

	while (x <= y) {
		sim(x, y);

		if (d < 0) {
			d += 4 * x + 6;
		} else {
			d += 4 * (x - y) + 10;
			--y;
		}
		++x;
	}
}