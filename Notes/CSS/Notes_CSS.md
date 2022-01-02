# CSS

- All html elemnts are rectangles
- Anything applied to an upper level element will be applied to a lower level element
- The order in which styles are declared matters for styles of same priority. ex: two classes declared in one order and given to an element in any order

```css
  .pink-text {
    color: pink;
  }
  .blue-text {
    color: blue;
  }
```

```html
  <h1 class='blue-text pink-text'>Bamm!</h1>
```

in the above ex, `Bamm` would be blue *unless if an id is attached to the element as it is more specific* or `!important` (don't use unless you HAVE to)

- Three properties control space _around_ elements:

  - padding - Space around text (content); distance between content and border
  - margin - Space outside border that surrounds padding; distance between elements

    - _-ve_ margin fuses elements into eachother

  - border - Space between padding and margin

- Absolute vs Relative units

  - Relative units, such as _em or rem_, are relative to another length value. For example, _em_ is based on the size of an element's font. If you use it to set the font-size property itself, it's relative to the parent's font-size.

## Flexbox

- After adding `display: flex`, the element becomes a flex container and any children can be aligned into rows or columns, `flex-direction` is used to do that. `flex-direction: row` is default

- `justify-content`, for `flex-direction: row` (default), aligns items along `main-axis`. For `flex-direction: column` the main-axis(x-axis) and cross-axis(y-axis) are flipped
  - `justify-content: flex-start` place stuff at the beginning of the flex-container. `end` is exact opposite

- `align-items` does the same as above but along the cross-axis

- `flex-shrink` applies to items in the container. opposite of `flex-grow`

## Sources

- [freeCodeCamp, basic css](https://learn.freecodecamp.org/responsive-web-design/basic-css/)

- [freeCodeCamp, CSS Grid](https://learn.freecodecamp.org/responsive-web-design/css-grid/)

- [freeCodeCamp, Responsive Web Design,CSS Flexbox](https://learn.freecodecamp.org/responsive-web-design/css-flexbox/)

- [YouTube](https://www.youtube.com/watch?v=ieTHC78giGQ)
