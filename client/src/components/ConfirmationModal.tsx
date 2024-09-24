import React from "react";

interface ConfirmationModalProps {
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	message,
	onConfirm,
	onCancel,
}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<p className="mb-6">{message}</p>
				<div className="flex justify-end space-x-4">
					<button
						onClick={onCancel}
						className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
					>
						لغو
					</button>
					<button
						onClick={onConfirm}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
					>
						حذف
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
