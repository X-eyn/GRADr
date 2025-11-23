import React, { useCallback, useState } from 'react';

interface ImageUploadProps {
  onImageSelected: (base64: string) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      onImageSelected(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (isProcessing) return;
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    [isProcessing]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative overflow-hidden rounded-3xl border border-dashed transition-all duration-500 ease-out
        ${isDragging ? 'border-white bg-neutral-900 scale-[1.02]' : 'border-neutral-700 bg-black hover:border-neutral-500 hover:bg-neutral-900'}
        ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        group
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <div className={`mb-8 rounded-full p-6 transition-colors duration-300 ${isDragging ? 'bg-white text-black' : 'bg-neutral-900 text-white border border-neutral-800 group-hover:border-neutral-600'}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-10 w-10 transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">
          {isDragging ? 'Drop to Upload' : 'Upload Script'}
        </h3>
        <p className="text-neutral-400 max-w-sm mx-auto font-light leading-relaxed">
          Drag and drop an image of homework, an essay, or a test answer, or click to browse.
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;