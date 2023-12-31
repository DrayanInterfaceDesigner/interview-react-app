class SortException(Exception):
    def __init__(self, message) -> None:
        super().__init__(message)
        self.message = message
    
    def __str__(self) -> str:
        super().__str__()
        return f"SortException: {self.message}"