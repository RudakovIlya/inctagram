import React, { memo } from 'react'
import DarkIcon from 'shared/assets/icons/general/theme-dark.svg'
import LightIcon from 'shared/assets/icons/general/theme-light.svg'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { Button } from 'shared/ui/Button/Button'
import clsx from 'clsx'

interface ThemeSwitcherProps {
    className?: string
    size?: number
}

export const ThemeSwitcher = memo(({ className, size = 25 }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()
    if (!theme) return null
    return (
        <Button
                theme={'clear'}
                onClick={toggleTheme}
                style={{ lineHeight: 0 }}
                className={clsx('', {}, [className])}>
            {theme === Theme.DARK
                ? <DarkIcon height={size} width={size}/>
                : <LightIcon height={size} width={size}/>}
        </Button>
    )
}
)
