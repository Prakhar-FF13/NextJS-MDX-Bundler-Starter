import fs from "fs";
import { bundleMDX } from "mdx-bundler";

/**
 *
 * @param {String} mdxFile - file which is to converted from MDX.
 * @param {String} currentWorkingDirectory - where the file is located
 * @returns code and frontmatter
 */
export const prepareMDX = async (mdxFile, currentWorkingDirectory) => {
  try {
    // bundle the mdx file and other things together.
    const { code, frontmatter } = await bundleMDX(mdxFile, {
      cwd: currentWorkingDirectory,
    });
    return {
      code,
      frontmatter,
    };
  } catch (e) {
    console.log("\n***********\n");
    console.log("Error in prepareMDX Function");
    console.log(e.message);
    console.log("\n***********\n");
  }
};

/**
 * @param {String} folder - folder name where the MDX files are stored.
 * @returns filenames without extension
 *
 * Function generates slugs for dynamic routes - all files in a folder are dynamic routes.
 */
export const getAllSlugs = (folder) => {
  try {
    const files = fs
      .readdirSync(folder, {
        withFileTypes: true, // gives a file handler.
      })
      .filter((dirent) => dirent.isFile()) // check from file handler that if it is a file.
      .map((file) => {
        return {
          params: {
            slug: file.name.split(".")[0],
          },
        };
      });
    return files;
  } catch (e) {
    console.log("\n***********\n");
    console.log("Error in getAllSlugs Function");
    console.log(e.message);
    console.log("\n***********\n");
  }
};

/**
 *
 * @param {String} fileName - filename with extension which is to be loaded.
 * @returns file in string format.
 */
export const getAFile = (fileName) => {
  try {
    return fs.readFileSync(fileName + ".mdx");
  } catch (e) {
    console.log("\n***********\n");
    console.log("Error in getAFile Function");
    console.log(e.message);
    console.log("\n***********\n");
  }
};
