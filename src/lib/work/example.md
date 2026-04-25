---
title: Example
role: Markdown reference
period: null
image: /fotokirsti_compressed.webp
category: work
order: 999
hidden: true
---

This is a hidden reference page that documents every markdown feature supported by the work post pipeline. You can use **bold** and *italic* text, plus [links](https://example.com).

## Overview

The site features a minimal, image-led design that puts the content front and center.

## Tech Stack

- SvelteKit
- Tailwind CSS
- Deployed on Railway

## Code with line numbers and filename

```ts {1-3,5} {10-12}#add {15-17}#remove showLineNumbers title="calculator.ts"
console.log('Hello, world!')

function add(a: number, b: number): number {
    return a + b
}

class Calculator {
    constructor(private initialValue: number = 0) {}

    add(value: number): this {
        this.initialValue += value
        return this
    }

    getValue(): number {
        return this.initialValue
    }
}

const calc = new Calculator(10).add(5).add(3)

console.log(calc.getValue()) // 18
```

## Feature table

| Feature          | Status | Notes                     |
| ---------------- | ------ | ------------------------- |
| Basic markdown   | ✅     | All implemented           |
| Code blocks      | ✅     | With line numbers         |
| Tables           | ✅     | Responsive styling        |
| Images           | ✅     | Rounded corners           |
| Styled lists     | ✅     | Full boxes with bullets   |

## Bullet and numbered lists (styled boxes)

**Unordered list:**

- First item
- Second item
- Third item

**Ordered list:**

1. First step
2. Second step
3. Third step

## Images in the body

Images in markdown get rounded corners automatically:

![Photography portfolio screenshot](/fotokirsti_compressed.webp)

## Blockquote

> This is a blockquote. Useful for pull quotes or callouts.
