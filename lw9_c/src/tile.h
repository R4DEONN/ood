#pragma once
#include <array>
#include <cassert>

#include "geom.h"

class Tile
{
public:
	// Размер тайла 8*8 пикселей.
	constexpr static int SIZE = 8;

	// Конструктор по умолчанию. Заполняет тайл указанным цветом.
	explicit Tile(const char color = ' ') noexcept
	{
		for (auto& pixelRow : m_pixels)
		{
			for (auto& pixel : pixelRow)
			{
				pixel = color;
			}
		}

		// -------------- не удалять ------------
		assert(m_instanceCount >= 0);
		++m_instanceCount; // Увеличиваем счётчик тайлов (для целей тестирования).
		// -------------- не удалять ------------
	}

	Tile(const Tile& other)
	{
		/* Реализуйте недостающий код самостоятельно. */
		for (int y = 0; y < SIZE; ++y)
		{
			for (int x = 0; x < SIZE; ++x)
			{
				m_pixels[y][x] = other.m_pixels[y][x];
			}
		}

		// -------------- не удалять ------------
		assert(m_instanceCount >= 0);
		++m_instanceCount; // Увеличиваем счётчик тайлов (для целей тестирования).
		// -------------- не удалять ------------
	}

	~Tile()
	{
		// -------------- не удалять ------------
		--m_instanceCount; // Уменьшаем счётчик тайлов.
		assert(m_instanceCount >= 0);
		// -------------- не удалять ------------
	}

	/**
     * Изменяет цвет пикселя тайла.
     * Если координаты выходят за пределы тайла, метод ничего не делает.
     */
	void SetPixel(const Point p, const char color) noexcept
	{
		/* Реализуйте недостающий код самостоятельно. */
		if (!IsPointInTileSize(p))
		{
			return;
		}

		m_pixels[p.y][p.x] = color;
	}

	/**
     * Возвращает цвет пикселя. Если координаты выходят за пределы тайла, возвращается пробел.
     */
	[[nodiscard]] char GetPixel(Point p) const noexcept
	{
		/* Реализуйте недостающий функционал самостоятельно. */
		if (IsPointInTileSize(p))
		{
			return m_pixels[p.y][p.x];
		}

		return ' ';
	}

	// Возвращает количество экземпляра класса Tile в программе.
	static int GetInstanceCount() noexcept
	{
		// -------------- не удалять ------------
		return m_instanceCount;
		// -------------- не удалять ------------
	}

private:
	// -------------- не удалять ------------
	inline static int m_instanceCount = 0;
	// -------------- не удалять ------------

	/* Разместите здесь поля для хранения пикселей тайла. */
	char m_pixels[SIZE][SIZE]{}; // Хранение пикселей тайла

	constexpr static Size m_tileSize = {SIZE, SIZE};

	static bool IsPointInTileSize(const Point p) noexcept
	{
		return IsPointInSize(p, m_tileSize);
	}
};


