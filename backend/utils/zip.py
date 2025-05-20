from fastapi import UploadFile
import zipfile

class ZipError(Exception):
    pass

class ZipService:
    requiredFiles = set({"problem/", "problem/problem.md", "problem/inputs/", "problem/outputs/"})
    inputFolder = "problem/inputs/"
    outputFolder = "problem/outputs/"

    @staticmethod
    def count_files(folderName: str, fileNames: set[str]):
        count = 0
        for fileName in fileNames:
            if fileName.startswith(folderName):
                count += 1
        return count

    @staticmethod
    def matching_IO_files(fileNames: set[str]):
        inputFolder = ZipService.inputFolder
        outputFolder = ZipService.outputFolder
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
    def validate(file: UploadFile):
        try: 
            with zipfile.ZipFile(file.file) as zf:
                fileNames = set(zf.namelist())

                missing_files = ZipService.requiredFiles - fileNames
                if missing_files:
                    raise ZipError(f"Missing required files in the zip file: {', '.join(missing_files)}")

                inputCount = ZipService.count_files(ZipService.inputFolder, fileNames)
                outputCount = ZipService.count_files(ZipService.outputFolder, fileNames)

                if inputCount != outputCount:
                    raise ZipError("Number of input and output files do not match.")

                if inputCount == 1:
                    raise ZipError("No input/output files found.")

                if not ZipService.matching_IO_files(fileNames):
                    raise ZipError("Input and output files do not match.")
        
        except zipfile.BadZipFile:
            raise ZipError("Uploaded file is not a valid zip file.")

    @staticmethod
    def extract_problem_statement(file: UploadFile):
        with zipfile.ZipFile(file.file) as zf:
            with zf.open("problem/problem.md") as f:
                return f.read().decode("utf-8")