import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";

interface AddTaskDialogProps {
    open: boolean;
    onClose: () => void;
    onAddTask: (taskText: string) => void;
}

const AddTaskDialog = ({ open, onClose, onAddTask }: AddTaskDialogProps) => {
    const [taskText, setTaskText] = useState("");
    const themeContext = useContext(ThemeContext);  // Get theme context

    if (!themeContext) return null; // Ensure context is available
    const { theme } = themeContext;

    // Determine styles based on theme
    const dialogStyles = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";

    const handleAdd = () => {
        if (taskText.trim() !== "") {
            onAddTask(taskText);
            setTaskText("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className={`p-4 rounded-lg ${dialogStyles}`}>
                <DialogTitle className="text-center">New Note</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter task description"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        InputProps={{
                            style: { color: theme === "dark" ? "white" : "black" },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined" color={theme === "dark" ? "secondary" : "primary"}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="contained" color={theme === "dark" ? "secondary" : "primary"}>
                        Add
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default AddTaskDialog;
