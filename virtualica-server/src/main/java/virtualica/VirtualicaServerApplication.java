package virtualica;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import virtualica.entity.Room;
import virtualica.entity.User;
import virtualica.service.RoomService;
import virtualica.service.SessionService;
import virtualica.service.UserService;

import java.sql.Timestamp;

@SpringBootApplication
public class VirtualicaServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(VirtualicaServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(UserService userService, RoomService roomService, SessionService sessionService) {
		return args -> {
			User ghiyas = User.builder().name("Aprijal Ghiyas Setiawan").email("aprijalghiyas@gmail.com").password("subang12345").role("ADMIN").build();
			User ainun = User.builder().name("Ainun Nisa").email("ainunnisa@gmail.com").password("bandung2002").role("USER").build();
			User deki = User.builder().name("Deki Geraldi").email("dekigeraldi@gmail.com").password("ciater12345").role("USER").build();

			userService.saveUser(ghiyas);
			userService.saveUser(ainun);
			userService.saveUser(deki);

			Room room1 = Room.builder()
					.roomName("Biochemistry 5")
					.roomDescription("Room for discussion of Biochemistry group 5 about enzyme")
					.owner(ghiyas)
					.createdAt(new Timestamp(System.currentTimeMillis()))
					.build();

			Room room2 = Room.builder()
					.roomName("Seminar of Aprijal")
					.roomDescription("Room for Biochemistry seminar of Aprijal Ghiyas Setiawan")
					.owner(ghiyas)
					.createdAt(new Timestamp(System.currentTimeMillis()))
					.build();

			roomService.saveRoom(room1);
			roomService.saveRoom(room2);

			sessionService.addRoom("123");
		};
	}
}
