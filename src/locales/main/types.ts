interface IContributor {
  name: string;
  role: string;
}

interface IMainTranslation {
  mainTitle: string;
  mainAboutApp: string;
  mainContent: string;
  mainAboutTeam: string;
  mainTeamIntro: string;
  mainAboutCourse: string;
  mainCourseIntro: string;
  mainAPIInteraction: string;
  mainRestfulPath: string;
  mainGraphQLPath: string;
  mainHistoryPath: string;
  mainAuthRequired: string;
  mainSignIn: string;
  mainSignUp: string;
  contributors: {
    TatyanaAntipova: IContributor;
    MaximRavinskiy: IContributor;
    NikolayMakarevich: IContributor;
  };
}

export type { IMainTranslation };
