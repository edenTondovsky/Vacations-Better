class AppConfig {
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";
    public AdminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
    public UserVacationsUrl = "http://localhost:4000/api/user/vacations/";
    public UserFollowUrl = "http://localhost:4000/api/user/follow/";
   
}

const appConfig = new AppConfig();

export default appConfig;
