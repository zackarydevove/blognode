const OptionsDropdown: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
    return (
        <div className="absolute bg-white rounded mt-2 w-40 right-0 z-10 shadow">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={onDelete}>
                Delete Post
            </button>
        </div>
    );
};

export default OptionsDropdown