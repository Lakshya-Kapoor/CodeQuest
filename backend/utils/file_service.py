from fastapi import UploadFile
import zipfile

class FileError(Exception):
    pass

class FileService:
    requiredFiles = set({"problem/", "problem/problem.md", "problem/inputs/", "problem/outputs/"})
    inputFolder = "problem/inputs/"
    outputFolder = "problem/outputs/"
    MAX_ZIP_SIZE = 10 * 1024 * 1024  # 10 MB
    MAX_FILE_SIZE = 1 * 1024 * 1024  # 1 MB

    @staticmethod
    def count_files(folderName: str, fileNames: set[str]):
        count = 0
        for fileName in fileNames:
            if fileName.startswith(folderName):
                count += 1
        return count

    @staticmethod
    def matching_IO_files(fileNames: set[str]):
        inputFolder = FileService.inputFolder
        outputFolder = FileService.outputFolder
        for fileName in fileNames:
            if fileName.startswith(inputFolder):
                outputFile = fileName.replace(inputFolder, outputFolder)
                if outputFile not in fileNames:
                    return False
            if fileName.startswith(outputFolder):
                inputFile = fileName.replace(outputFolder, inputFolder)
                if inputFile not in fileNames:
                    return False
        return True

    @staticmethod
    def validate_zip(file: UploadFile):
        try: 
            with zipfile.ZipFile(file.file) as zf:
                fileNames = set(zf.namelist())

                missing_files = FileService.requiredFiles - fileNames
                if missing_files:
                    raise FileError(f"Missing required files in the zip file: {', '.join(missing_files)}")

                inputCount = FileService.count_files(FileService.inputFolder, fileNames)
                outputCount = FileService.count_files(FileService.outputFolder, fileNames)

                if inputCount != outputCount:
                    raise FileError("Number of input and output files do not match.")

                if inputCount == 1:
                    raise FileError("No input/output files found.")

                if not FileService.matching_IO_files(fileNames):
                    raise FileError("Input and output files do not match.")
        
        except zipfile.BadZipFile:
            raise FileError("Uploaded file is not a valid zip file.")

    @staticmethod
    def extract_problem_statement(file: UploadFile):
        with zipfile.ZipFile(file.file) as zf:
            with zf.open("problem/problem.md") as f:
                return f.read().decode("utf-8")