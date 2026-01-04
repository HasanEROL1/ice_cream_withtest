import { render, screen } from "@testing-library/react";
import Selector from "../components/list/selector";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Selector bileşen testleri", () => {
    it("Cornet seçilince butonun arka planı değişmeli", () => {
        render(<Selector selectedType="cornet" handleType={() => { }} />);

        const CornetBtn = screen.getByRole("button", { name: /külahta/i });
        const CupBtn = screen.getByRole("button", { name: /bardakta/i });

        // Cornet aktif olmalı
        expect(CornetBtn.className).toContain("bg-white/30");
        expect(CornetBtn.className).toContain("text-black");

        // Cup pasif olmalı
        expect(CupBtn.className).not.toContain("bg-white/30");
        expect(CupBtn.className).not.toContain("text-black");
    });

    it("Cup seçilince butonun arka planı değişmeli", () => {
        render(<Selector selectedType="cup" handleType={() => { }} />);

        const CornetBtn = screen.getByRole("button", { name: /külahta/i });
        const CupBtn = screen.getByRole("button", { name: /bardakta/i });

        expect(CornetBtn.className).not.toContain("bg-white/30");
        expect(CornetBtn.className).not.toContain("text-black");

        expect(CupBtn.className).toContain("bg-white/30");
        expect(CupBtn.className).toContain("text-black");
    });

    it("Butonlara tıklanınca doğru parametre ile çağrılmalı", async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn();

        render(<Selector selectedType={null} handleType={mockFn} />);

        const CornetBtn = screen.getByRole("button", { name: /külahta/i });
        const CupBtn = screen.getByRole("button", { name: /bardakta/i });

        await user.click(CornetBtn);
        await user.click(CupBtn);

        // Fonksiyonun çağrı sırasını kontrol edelim
        expect(mockFn).toHaveBeenNthCalledWith(1, "cornet");
        expect(mockFn).toHaveBeenNthCalledWith(2, "cup");
    });
});
