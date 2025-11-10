# F1 Championship Predictor

A modern web application that helps predict Formula 1 championship outcomes by analyzing race data and visualizing championship standings.

## Features

- Real-time F1 race data integration using OpenF1 API
- Driver standings visualization
- Constructor standings tracking
- Championship prediction charts
- Interactive data simulation
- Responsive dashboard interface

## Technologies Used

### Frontend Framework & Build Tools
- React 18
- TypeScript
- Vite (for fast development and optimized builds)

### UI Components & Styling
- shadcn/ui (Built on Radix UI primitives)
- Tailwind CSS
- Radix UI components for accessible UI elements
- Recharts for data visualization

### Data Management & API
- OpenF1 API for real-time Formula 1 data
- React Query for data fetching and caching
- React Router for navigation

### Development Tools
- ESLint for code linting
- TypeScript for type safety
- PostCSS for CSS processing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/dbestvarun/f1-champ-predictor.git
```

2. Install dependencies:
```bash
cd f1-champ-predictor
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## API Integration

The project uses the OpenF1 API (https://api.openf1.org/v1) to fetch:
- Current season sessions
- Driver information
- Race results and positions
- Championship standings

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Mock data and constants
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Main application pages
├── services/      # API and data services
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
