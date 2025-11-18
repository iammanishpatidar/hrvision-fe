import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="font-Poppins">
      <Toaster />
      <Outlet />
    </div>
  );
}

export default App;
