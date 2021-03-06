package fr.telecom_st_etienne.ontientlebonbout.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.TestUtil;

public class MediaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Media.class);
        Media media1 = new Media();
        media1.setId(1L);
        Media media2 = new Media();
        media2.setId(media1.getId());
        assertThat(media1).isEqualTo(media2);
        media2.setId(2L);
        assertThat(media1).isNotEqualTo(media2);
        media1.setId(null);
        assertThat(media1).isNotEqualTo(media2);
    }
}
