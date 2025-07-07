# React Expandable Scroll List

A React application that demonstrates an interactive scrollable list with expandable elements. Click on any element to enlarge it with smooth animations and fixed positioning that follows the scroll.

## 🚀 Live Demo

[View Live Demo](https://foysal-mahmud-hasan.github.io/react-expandable-scroll-list) *(Coming Soon)*

## Features

- **Interactive Elements**: Click on any list item to expand it
- **Smooth Animations**: Elements smoothly transition between normal and enlarged states
- **Scroll-Aware Positioning**: Enlarged elements maintain their position relative to the original location during scroll
- **Visibility Detection**: Elements automatically hide when scrolled out of view
- **Performance Optimized**: Uses `requestAnimationFrame` with throttling for smooth 60fps animations
- **Responsive Design**: Adapts to different viewport sizes

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Mantine UI** - Component library for beautiful UI elements
- **CSS-in-JS** - Inline styles for dynamic styling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/foysal-mahmud-hasan/react-expandable-scroll-list.git
cd react-expandable-scroll-list
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How It Works

### Core Functionality

The application creates a scrollable list of 10 elements. When you click on any element:

1. **Element Expansion**: The clicked element doubles in width and switches to fixed positioning
2. **Position Tracking**: The element maintains its visual position using `getBoundingClientRect()`
3. **Scroll Synchronization**: As you scroll, the enlarged element follows the original position
4. **Visibility Management**: If the original position scrolls out of view, the enlarged element hides

### Key Components

- **ScrollArea**: Mantine component providing the scrollable container
- **Box Elements**: Individual list items that can be expanded
- **Position Portal**: System for tracking and updating element positions
- **Animation Loop**: `requestAnimationFrame` based positioning updates

### State Management

```javascript
const [enlargedIndex, setEnlargedIndex] = useState(null); // Which element is expanded
const [boxPortal, setBoxPortal] = useState({
  index: null, // Current element index
  top: 0, // Y position
  left: 0, // X position
  width: 0, // Original width
  visible: true, // Visibility state
});
```

## Customization

### Modifying the List

Change the number of elements by updating the array generation:

```javascript
{
  Array.from({ length: 20 }).map((_, i) => {
    // Your elements here
  });
}
```

### Styling

The project uses inline styles for dynamic behavior. You can customize:

- **Colors**: Change `bg` props on Box components
- **Dimensions**: Modify `h`, `w`, and other size properties
- **Animation**: Adjust the `throttleMs` value for different frame rates

### Layout

- **Container Size**: Modify the ScrollArea `h` and `w` props
- **Element Sizing**: Change the Box `h` and width calculations
- **Spacing**: Adjust `p` (padding) and `m` (margin) values

## Performance Features

- **Throttled Updates**: Position updates are limited to 60fps using `requestAnimationFrame`
- **Cleanup**: Proper cleanup of animation frames to prevent memory leaks
- **Efficient Rendering**: Only the enlarged element uses fixed positioning

## Browser Compatibility

- Modern browsers supporting ES6+ features
- CSS Grid and Flexbox support required
- `getBoundingClientRect()` API support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Mantine](https://mantine.dev/) for the excellent UI components
- [Vite](https://vitejs.dev/) for the fast development experience
- [React](https://reactjs.org/) for the component architecture

## Future Enhancements

- [ ] Add smooth transition animations
- [ ] Support for multiple simultaneous expanded elements
- [ ] Keyboard navigation support
- [ ] Touch/mobile gesture support
- [ ] Customizable expansion behavior
- [ ] Virtual scrolling for large lists

---

Made with ❤️ using React and Mantine
