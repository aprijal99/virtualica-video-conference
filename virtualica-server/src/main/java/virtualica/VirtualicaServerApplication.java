package virtualica;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import virtualica.entity.User;
import virtualica.service.UserService;

@SpringBootApplication
public class VirtualicaServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(VirtualicaServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(
			UserService userService
	) {
		return args -> {
			User ghiyas = User.builder().name("Aprijal Ghiyas Setiawan").email("aprijalghiyas@gmail.com").password("subang12345").role("ADMIN").build();
			User ainun = User.builder().name("Ainun Nisa").email("ainunnisa@gmail.com").password("bandung2002").role("USER").build();
			User deki = User.builder().name("Deki Geraldi").email("dekigeraldi@gmail.com").password("ciater12345").role("USER").build();

			userService.saveUser(ghiyas);
			userService.saveUser(ainun);
			userService.saveUser(deki);
		};
	}
}
