# PyInstaller/Electron action to build a Windows/macOS installer(s)

## Examples

This project hosts an example project which is automatically built each time the repo is updated:
https://github.com/MissionBio/actions/blob/main/.github/workflows/main.yml

Mosaic-streamlit uses this action to generate build and installer for it:
https://github.com/MissionBio/mosaic-streamlit/blob/master/.github/workflows/build-releases.yml


## Requirements

Your project needs stuff from Python/Node ecosystem(s), this needs to run before the build step.
Check "Setup Python/Node" in existing examples.


## The build input arguments

**source_path** is the location of Python code.

**build_path** is the location of the build folder where the build script and all the required resources should be stored.

**build_script** is available if you need to name the script in some specific way. By default `build-{{ os/sytem name }}.sh` will be used.

**electron_path** is the location of of the Electron source code.

## The artifact(s)

When the build creates installers they are not automatically stored.
You need to use `upload-artifact` action to store it permanently.

Environment variable *PRODUCT_OS_AND_VERSION* is available and should be used when uploading artifact(s).

## Example

```yaml
  - name: Build release(s)
    uses: MissionBio/actions@v0.1.3
    with:
      source_path: .
      build_path: build
      electron_path: mosaic-streamlit
    env:
      MOSAIC_STREAMLIT_GUI_RUNNING: true
      PYTHONPATH: ${{ env.PYTHONPATH }}
```

## Notes

GitHub Actions have very limited options to compose actions.
The rather long workflow file can be reduced to 3-5 lines after some features (will be available eventually) to enable better composition are officially added.
This includes things like "Setup Python/Node" and artifact placement.
