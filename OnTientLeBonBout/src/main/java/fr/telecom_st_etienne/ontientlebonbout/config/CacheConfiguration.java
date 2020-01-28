package fr.telecom_st_etienne.ontientlebonbout.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.User.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Authority.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.User.class.getName() + ".authorities");
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Client.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Client.class.getName() + ".questionnaires");
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Question.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Question.class.getName() + ".reponses");
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire.class.getName() + ".invites");
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire.class.getName() + ".questions");
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Theme.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Reponse.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Invite.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Invite.class.getName() + ".reponses");
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Media.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.MediaStatique.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Image.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.MediaDynamique.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Video.class.getName());
            createCache(cm, fr.telecom_st_etienne.ontientlebonbout.domain.Musique.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
