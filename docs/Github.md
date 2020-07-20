# Github with TrackIT

## Pull Request Guide

#### Naming Scheme

- `feature/***-***` for enhancements and additional capabilities
- `fix/***-***` for when bugs are addressed or broken things get fixed into working things
- `update/***-***` for incremental changes that do not add a new feature but rather improve the existing ones
- `internal/***-***` for documentation changes or changes that do not update the functionality of the program

#### Required Information

- Short summary for updates
- Bullet point list that encapsulates in full detail the changes that have been made. No detail is too small
- If there are any known bugs in your branch which will get merged to dev mention them
- Assign developers that worked on the PR
- Assign all other developers on the project as reviewers
- Link any issues that will be resolved by this PR
- Label the PR based on the type of changes made

#### Labelling Pull Requests and Issues

- `Dependencies` needs to be added if versions are incremented or new dependencies are added
- `Enhancement` needs to be added for feature branches and if changes add new functionality to the product
- `Bug` needs to be added for any branches that contain a fix
- `Documentation` needs to be added for a pull request that primary involves readme updates or inline documentation
- `Backend` needs to be added for any branches that primarily involve the backend
- `Frontend` needs to be added for any branches that primarily target the UI
- `Good First Issue` needs to be added for a pull request where the code changes are good for new developers to easily review
- `Internal` neeeds to be added for any changes to the continuous integration, continuous deployment pipelines or the configuration of the product
- `Test` needs to be added when adding new jest/enzyme test cases

Note: The same labels also apply to issues. When creating issues use the available templates to appropriately document required information.

#### Merging Pull Request

- Pull Request must pass testing locally for both assigned and reviewing developer
- Must pass continuous-integration [workflow](https://github.com/acmutd/TrackIT/blob/dev/.github/workflows/nodejs.yml)
- Pull Request must be merged by a reviewer who did _not_ work on the branch
- Packaging a release and merging from `dev` to `master` must happen when all developers are present and the application has undergone a full regression test

[Example Pull Request](https://github.com/acmutd/TrackIT/pull/37)

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)
