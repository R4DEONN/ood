import { Image } from '../src/Image'; // Путь к вашему файлу с классом Image
import { Tile } from '../src/Tile'; // Путь к вашему файлу с классом Tile
import {beforeEach, describe, expect, jest, test} from "@jest/globals";

describe('Tile Class', () => {
    beforeEach(() => {
        // Сбрасываем счетчик экземпляров перед каждым тестом
        Tile.resetInstanceCount();
    });

    test('should create a tile with default color', () => {
        const tile = new Tile();
        expect(tile.getPixel({ x: 0, y: 0 })).toBe(' '); // Проверяем, что цвет по умолчанию - пробел
    });

    test('should set and get pixel color in tile', () => {
        const tile = new Tile();
        tile.setPixel({ x: 0, y: 0 }, '#');
        expect(tile.getPixel({ x: 0, y: 0 })).toBe('#');
    });

    test('should return space for out of bounds pixel', () => {
        const tile = new Tile();
        expect(tile.getPixel({ x: 8, y: 8 })).toBe(' '); // Проверяем выход за пределы
    });

    test('should count instances of tiles', () => {
        expect(Tile.getInstanceCount()).toBe(0); // Сначала должно быть 0 экземпляров
        const tile1 = new Tile();
        expect(Tile.getInstanceCount()).toBe(1); // Один экземпляр создан
        const tile2 = new Tile();
        expect(Tile.getInstanceCount()).toBe(2); // Два экземпляра созданы
        tile1.setPixel({ x: 0, y: 0 }, '#');
        expect(Tile.getInstanceCount()).toBe(2); // Количество экземпляров не должно измениться
    });
});

describe('Image Class', () => {
    let image: Image;

    beforeEach(() => {
        image = new Image({ width: 16, height: 16 }, '.'); // Создаем новое изображение перед каждым тестом
    });

    test('should get pixel color', () => {
        expect(image.getPixel({ x: 0, y: 0 })).toBe('.'); // Проверяем цвет по умолчанию
    });

    test('should set and get pixel color', () => {
        image.setPixel({ x: 1, y: 1 }, '#');
        expect(image.getPixel({ x: 1, y: 1 })).toBe('#'); // Проверяем установленный цвет
    });

    test('should return space for out of bounds pixel', () => {
        expect(image.getPixel({ x: -1, y: -1 })).toBe(' '); // Проверяем выход за пределы
        expect(image.getPixel({ x: 20, y: 20 })).toBe(' '); // Проверяем выход за пределы
    });

    test('should manage tiles correctly when setting pixels', () => {
        const initialTileCount = Tile.getInstanceCount();

        image.setPixel({ x: 1, y: 1 }, '#');

        expect(Tile.getInstanceCount()).toBe(initialTileCount + 1); // Новый тайл должен быть создан

        image.setPixel({ x: 1, y: 1 }, '@'); // Изменяем цвет в уже существующем тайле

        expect(image.getPixel({ x: 1, y: 1 })).toBe('@'); // Проверяем новый цвет
    });
});
