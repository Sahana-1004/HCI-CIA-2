import { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AccessibilityMenuProps {
  onClose: () => void;
}

export function AccessibilityMenu({ onClose }: AccessibilityMenuProps) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);
  const [screenReader, setScreenReader] = useState(true);
  
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Update font size of document
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontSize]);
  
  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    return () => {
      document.documentElement.classList.remove('high-contrast');
    };
  }, [highContrast]);
  
  // Apply reduced animations
  useEffect(() => {
    if (reduceAnimations) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    return () => {
      document.documentElement.classList.remove('reduce-motion');
    };
  }, [reduceAnimations]);
  
  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
    >
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2">Accessibility Options</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-sm block mb-1">Font Size</Label>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                aria-label="Decrease font size"
              >
                A-
              </Button>
              <Slider
                value={[fontSize]}
                min={80}
                max={120}
                step={5}
                onValueChange={(value) => setFontSize(value[0])}
                aria-label="Font size"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => setFontSize(Math.min(120, fontSize + 10))}
                aria-label="Increase font size"
              >
                A+
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="text-sm">
              High Contrast Mode
            </Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
              aria-label="Toggle high contrast mode"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="reduce-animations" className="text-sm">
              Reduce Animations
            </Label>
            <Switch
              id="reduce-animations"
              checked={reduceAnimations}
              onCheckedChange={setReduceAnimations}
              aria-label="Toggle reduce animations"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="screen-reader" className="text-sm">
              Screen Reader Support
            </Label>
            <Switch
              id="screen-reader"
              checked={screenReader}
              onCheckedChange={setScreenReader}
              aria-label="Toggle screen reader support"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
