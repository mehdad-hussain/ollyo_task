type GalleryHeaderProps = {
    selectedImagesCount: number;
    onClearSelection: () => void;
    onDeleteSelected: () => void;
};

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ selectedImagesCount, onClearSelection, onDeleteSelected }) => {
    return (
        <div className="flex justify-between px-6 py-3 border-b border-gray-300 shadow-inner">
            {selectedImagesCount === 0 ? (
                <p className="font-bold text-lg text-black transition-all">
                    Gallery
                </p>
            ) : (
                <div
                    className="flex gap-2 cursor-pointer"
                    onClick={onClearSelection}
                >
                    <input
                        type="checkbox"
                        checked={true}
                    // onChange={clearSelection}
                    />
                    <p className="font-semibold text-lg text-black transition-all">
                        {selectedImagesCount > 1
                            ? `${selectedImagesCount} files`
                            : `${selectedImagesCount} file`}{' '}
                        selected
                    </p>
                </div>
            )}
            {selectedImagesCount > 0 && (
                <button
                    onClick={onDeleteSelected}
                    className="text-red-600 text-sm font-semibold transition-all"
                >
                    Delete files
                </button>
            )}
        </div>
    );
};

export default GalleryHeader;