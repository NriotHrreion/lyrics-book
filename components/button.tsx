import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    icon?: ReactNode
    children?: ReactNode
}

export function Button(props: ButtonProps) {
    const style = "not-prose w-fit border rounded-lg px-3 py-2 cursor-pointer font-medium text-sm text-fd-secondary-foreground bg-fd-secondary transition-colors hover:text-fd-accent-foreground hover:bg-fd-accent"
        + (props.className ? (" "+ props.className) : "");

    return (
        props.href
        ? (
            <a
                href={props.href}
                className={style}
                target="_blank"
                rel="noreferrer noopener">
                {props.icon}
                {props.children}
            </a>
        )
        : (
            <button
                className={style}
                {...props}>
                {props.icon}
                {props.children}
            </button>
        )
    );
}
