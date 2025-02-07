import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Check } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

interface CV {
  id: string;
  name: string;
  file: File;
  uploadDate: Date;
}

function ApplyModal({ isOpen, onClose, jobTitle }: ApplyModalProps) {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [selectedCVs, setSelectedCVs] = useState<string[]>([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      addNewCVs(Array.from(files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    addNewCVs(Array.from(files));
  };

  const addNewCVs = (files: File[]) => {
    const newCVs = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      file,
      uploadDate: new Date()
    }));
    setCvs(prev => [...prev, ...newCVs]);
  };

  const toggleCVSelection = (cvId: string) => {
    setSelectedCVs(prev => 
      prev.includes(cvId)
        ? prev.filter(id => id !== cvId)
        : [...prev, cvId]
    );
  };

  const deleteCV = (cvId: string) => {
    setCvs(prev => prev.filter(cv => cv.id !== cvId));
    setSelectedCVs(prev => prev.filter(id => id !== cvId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCVData = cvs.filter(cv => selectedCVs.includes(cv.id));
    console.log('Submitting application:', {
      selectedCVs: selectedCVData,
      coverLetter
    });
    // Here you would typically make an API call to submit the application
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Apply for {jobTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your CVs</h3>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  isDragging
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your CV here, or click to select files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                  >
                    <Plus size={20} className="inline-block mr-2" />
                    Add CV
                  </label>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCVs.includes(cv.id)}
                        onChange={() => toggleCVSelection(cv.id)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {cv.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Uploaded {cv.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteCV(cv.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your cover letter here..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedCVs.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              <Check size={20} className="mr-2" />
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;