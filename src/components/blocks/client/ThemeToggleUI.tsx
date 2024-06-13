'use client';

import React, { useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import useHasMounted from '@/components/hooks/useHasMounted';

function LightThemeIcon() {
    return (
        <LuSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    );
}

function DarkThemeIcon() {
    return (
        <LuMoon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    );
}

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const hasMounted = useHasMounted();

    const toggleTheme = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
    };

    return (
        <Button
            id={'theme-toggle'}
            variant="outline"
            size="icon"
            onClick={toggleTheme}
        >
            {hasMounted && theme === 'dark' ? (
                <DarkThemeIcon />
            ) : (
                <LightThemeIcon />
            )}
        </Button>
    );
}
